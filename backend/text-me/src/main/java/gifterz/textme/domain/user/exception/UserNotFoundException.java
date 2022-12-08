package gifterz.textme.domain.user.exception;


import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.EntityNotFoundException;


public class UserNotFoundException extends EntityNotFoundException {
    public UserNotFoundException() {
        super(ErrorCode.USER_EMPTY);
    }
}
