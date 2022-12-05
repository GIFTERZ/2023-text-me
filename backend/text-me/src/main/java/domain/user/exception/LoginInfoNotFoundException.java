package domain.user.exception;


import error.ErrorCode;
import error.exception.InvalidValueException;

public class LoginInfoNotFoundException extends InvalidValueException {
    public LoginInfoNotFoundException() {
        super(ErrorCode.INVALID_LOGIN_INFO);
    }
}
