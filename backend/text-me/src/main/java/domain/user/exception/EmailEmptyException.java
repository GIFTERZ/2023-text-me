package domain.user.exception;


import error.ErrorCode;
import error.exception.EntityNotFoundException;

public class EmailEmptyException extends EntityNotFoundException {

    public EmailEmptyException() {
        super(ErrorCode.EMAIL_EMPTY);
    }

    public EmailEmptyException(String message) {
        super(message);
    }
}
