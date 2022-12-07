package gifterz.textme.s3Proxy;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import gifterz.textme.s3Proxy.exception.InvalidFileContentException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3Client.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        return findFile(s3FileName);
    }

    private String findFile(String fileName) {
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }
}
