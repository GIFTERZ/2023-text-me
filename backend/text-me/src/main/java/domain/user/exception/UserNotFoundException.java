package domain.user.exception;


import error.ErrorCode;
import error.exception.EntityNotFoundException;


public class UserNotFoundException extends EntityNotFoundException {
    public UserNotFoundException() {
        super(ErrorCode.USER_EMPTY);
    }
}
