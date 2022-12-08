package gifterz.textme.domain.user.exception;

import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.InvalidValueException;

public class EmailDuplicatedException extends InvalidValueException {
    public EmailDuplicatedException(String email) {
        super(email, ErrorCode.EMAIL_ALREADY_TAKEN);
    }
}
