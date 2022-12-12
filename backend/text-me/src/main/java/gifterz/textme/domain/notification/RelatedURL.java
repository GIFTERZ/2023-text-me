package gifterz.textme.domain.notification;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RelatedURL {

    @Column
    private String url;

    public RelatedURL(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
