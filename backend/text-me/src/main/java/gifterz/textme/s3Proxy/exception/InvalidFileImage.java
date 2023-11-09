package gifterz.textme.s3Proxy.exception;

import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.InvalidValueException;

public class InvalidFileImage extends InvalidValueException {
    public InvalidFileImage() {
        super(ErrorCode.Illegal_FILE);
    }
}
