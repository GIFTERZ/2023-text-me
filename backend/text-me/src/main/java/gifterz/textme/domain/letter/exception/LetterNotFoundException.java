package gifterz.textme.domain.letter.exception;


import gifterz.textme.error.ErrorCode;
import gifterz.textme.error.exception.EntityNotFoundException;


public class LetterNotFoundException extends EntityNotFoundException {
    public LetterNotFoundException() {
        super(ErrorCode.LETTER_EMPTY);
    }
}
