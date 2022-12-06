package gifterz.textme.domain.user.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TokenRefreshRequest {
    @NotBlank
    private String refreshToken;

}
