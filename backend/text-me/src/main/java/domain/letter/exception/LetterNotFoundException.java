package domain.letter.exception;


import error.ErrorCode;
import error.exception.EntityNotFoundException;


public class LetterNotFoundException extends EntityNotFoundException {
    public LetterNotFoundException() {
        super(ErrorCode.LETTER_EMPTY);
    }
}
