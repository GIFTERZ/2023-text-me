package gifterz.textme.s3Proxy.exception;


import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.InvalidValueException;

public class InvalidFileContentException extends InvalidValueException {

    public InvalidFileContentException() {
        super(ErrorCode.INVALID_FILE_CONTENT);
    }
}
