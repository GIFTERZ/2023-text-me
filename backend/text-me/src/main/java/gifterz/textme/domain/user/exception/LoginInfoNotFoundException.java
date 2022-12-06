package gifterz.textme.domain.user.exception;


import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.InvalidValueException;

public class LoginInfoNotFoundException extends InvalidValueException {
    public LoginInfoNotFoundException() {
        super(ErrorCode.INVALID_LOGIN_INFO);
    }
}
