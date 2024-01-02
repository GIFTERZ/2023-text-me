package gifterz.textme.domain.letter.dto.request;

import jakarta.validation.constraints.Email;

public record SlowLetterWithEmailRequest(
        @Email
        String email,
        String contents
) {
    public EmailWithContents toEmailWithContents() {
        return new EmailWithContents(email, contents);
    }
}
