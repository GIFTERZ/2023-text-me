package gifterz.textme.domain.letter.dto.request;


import jakarta.validation.constraints.Email;

public record EmailWithContents(
        @Email
        String email,
        String contents
) {
}
