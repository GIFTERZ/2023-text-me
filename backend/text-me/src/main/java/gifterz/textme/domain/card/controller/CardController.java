package gifterz.textme.domain.card.controller;

import gifterz.textme.domain.card.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCard(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        String uploadUrl = cardService.uploadCard(multipartFile);
        return ResponseEntity.ok().body(uploadUrl);
    }

    @GetMapping
    public ResponseEntity<List<String>> findCards() {
        List<String> cards = cardService.findCards();
        return ResponseEntity.ok().body(cards);
    }
}
