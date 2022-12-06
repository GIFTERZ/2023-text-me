package gifterz.textme.error.exception;

import gifterz.textme.error.ErrorCode;

public class EntityNotFoundException extends ApplicationException {

    public EntityNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }

    public EntityNotFoundException(String message) {
        super(message, ErrorCode.ENTITY_NOT_FOUND);
    }
}
