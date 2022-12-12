package gifterz.textme.domain.security.service;

import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Component
public class AesUtils {

    private final String secretKey = "3^mdfo9iu4alkj";

    public String encryption(String text) {
        try {
            Cipher cipher = Cipher.getInstance("AES");

            byte[] key = new byte[16];
            int i = 0;

            for(byte b : secretKey.getBytes()) {
                key[i++%16] ^= b;
            }

            cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "AES"));

            return new String(Hex.encodeHex(cipher.doFinal(text.getBytes(StandardCharsets.UTF_8)))).toUpperCase();
        } catch(Exception e) {
            return text;
        }
    }

    public String decryption(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance("AES");

            byte[] key = new byte[16];
            int i = 0;

            for(byte b : secretKey.getBytes()) {
                key[i++%16] ^= b;
            }

            cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"));

            return new String(cipher.doFinal(Hex.decodeHex(encryptedText.toCharArray())));
        } catch(Exception e) {
            return encryptedText;
        }
    }
}