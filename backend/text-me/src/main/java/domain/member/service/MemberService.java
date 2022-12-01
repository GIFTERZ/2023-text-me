package domain.member.service;

import domain.member.dto.request.SignUpRequest;
import domain.member.dto.response.UserResponse;
import domain.member.entity.Member;
import domain.member.entity.Password;
import domain.member.exception.EmailDuplicatedException;
import domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void signUp(SignUpRequest signUpRequest) {
        Member member = new Member(signUpRequest.getName(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword());
        Optional<Member> userExists = memberRepository.findByEmail(member.getEmail());

        if (userExists.isPresent()) {
            throw new EmailDuplicatedException(member.getEmail());
        }

        Password memberPassword = member.getPassword();
        String encodedPassword = bCryptPasswordEncoder.encode(memberPassword.getPassword());
        memberPassword.setPassword(encodedPassword);

        memberRepository.save(member);
    }

}
