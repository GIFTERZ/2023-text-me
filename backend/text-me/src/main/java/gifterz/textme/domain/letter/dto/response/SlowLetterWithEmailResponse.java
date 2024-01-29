package gifterz.textme.domain.letter.dto.response;

import gifterz.textme.domain.letter.dto.request.SenderInfo;

public record SlowLetterWithEmailResponse(
        SenderInfo senderInfo,
        String contents
) {
}
