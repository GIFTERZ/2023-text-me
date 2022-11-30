package domain.member.exception;


import error.ErrorCode;
import error.exception.EntityNotFoundException;

public class MemberEmailNotFound extends EntityNotFoundException {
    public MemberEmailNotFound() {
        super(ErrorCode.EMAIL_MEMBER_NOT_FOUND);
    }
}
