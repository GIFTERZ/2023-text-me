package gifterz.textme.domain.card.service;

import gifterz.textme.domain.card.entity.Card;
import gifterz.textme.domain.card.repository.CardRepository;
import gifterz.textme.s3Proxy.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CardService {
    private final CardRepository cardRepository;
    private final S3Service s3Service;

    @Transactional
    public String uploadCard(MultipartFile multipartFile) throws IOException {
        String uploadUrl = s3Service.upload(multipartFile);
        Card card = Card.from(uploadUrl);
        cardRepository.save(card);
        return card.getImageUrl();
    }

    public List<String> findCards() {
        return cardRepository.findAll()
                .stream()
                .map(Card::getImageUrl)
                .collect(Collectors.toList());
    }
}
