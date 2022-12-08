package gifterz.textme.s3Proxy;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/files")
@RestController
public class FileUploadController {

    private final S3Service s3Service;

    @PostMapping(value = "/upload", consumes = "multipart/*")
    public ResponseEntity<String> uploadFile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String uploadUrl = s3Service.upload(multipartFile);
        return ResponseEntity.ok().body(uploadUrl);
    }

}
