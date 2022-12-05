package domain.user.exception;

import error.ErrorCode;
import error.exception.InvalidValueException;

public class EmailDuplicatedException extends InvalidValueException {
    public EmailDuplicatedException(String email) {
        super(email, ErrorCode.EMAIL_ALREADY_TAKEN);
    }
}
