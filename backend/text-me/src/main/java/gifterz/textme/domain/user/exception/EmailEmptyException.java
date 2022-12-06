package gifterz.textme.domain.user.exception;


import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.EntityNotFoundException;

public class EmailEmptyException extends EntityNotFoundException {

    public EmailEmptyException() {
        super(ErrorCode.EMAIL_EMPTY);
    }

    public EmailEmptyException(String message) {
        super(message);
    }
}
