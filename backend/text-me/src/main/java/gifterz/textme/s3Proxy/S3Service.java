package gifterz.textme.s3Proxy;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import gifterz.textme.s3Proxy.exception.InvalidFileContentException;
import lombok.RequiredArgsConstructor;
import marvin.image.MarvinImage;
import org.apache.commons.lang3.ObjectUtils;
import org.marvinproject.image.transform.scale.Scale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    public String upload(MultipartFile multipartFile) throws IOException {
        String contentType = multipartFile.getContentType();
        if (ObjectUtils.isEmpty(contentType)) {
            throw new InvalidFileContentException();
        }
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
        String fileFormatName = multipartFile.getContentType()
                .substring(multipartFile.getContentType().lastIndexOf("/") + 1);
        MultipartFile resizedFile = resizeImage(s3FileName, fileFormatName, multipartFile, 3300);

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(resizedFile.getSize());
        objMeta.setContentType(multipartFile.getContentType());

        try (InputStream inputStream = resizedFile.getInputStream()) {
            amazonS3Client.putObject(bucket, s3FileName, inputStream, objMeta);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
        }
        return findFile(s3FileName);
    }

    public String findFile(String fileName) {
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    MultipartFile resizeImage(String fileName, String fileFormatName, MultipartFile originalImage, int targetWidth) {
        try {
            BufferedImage image = ImageIO.read(originalImage.getInputStream());
            int originWidth = image.getWidth();
            int originHeight = image.getHeight();

            if (originWidth < targetWidth)
                return originalImage;

            MarvinImage imageMarvin = new MarvinImage(image);

            Scale scale = new Scale();
            scale.load();
            scale.setAttribute("newWidth", targetWidth);
            scale.setAttribute("newHeight", targetWidth * originHeight / originWidth);
            scale.process(imageMarvin.clone(), imageMarvin, null, null, false);

            BufferedImage imageNoAlpha = imageMarvin.getBufferedImageNoAlpha();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(imageNoAlpha, fileFormatName, baos);
            baos.flush();

            return new MockMultipartFile(fileName, baos.toByteArray());

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 리사이즈에 실패했습니다.");
        }
    }
}
