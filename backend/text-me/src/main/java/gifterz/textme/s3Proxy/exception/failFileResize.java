package gifterz.textme.s3Proxy.exception;

import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.InvalidValueException;

public class failFileResize extends InvalidValueException {
    public failFileResize() {
        super(ErrorCode.FAIL_FILE_RESIZE);
    }
}
