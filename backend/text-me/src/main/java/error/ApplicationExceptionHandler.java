package error;

import error.exception.ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Objects;

@RestControllerAdvice
@Slf4j
public class ApplicationExceptionHandler {

    @ExceptionHandler
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(final MethodArgumentNotValidException err) {
        log.error("handleMethodArgumentNotValidException", err);
        final ErrorResponse response = ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE, err.getBindingResult());
        response.changeMessage(Objects.requireNonNull(err.getFieldError()).getDefaultMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    protected ResponseEntity<ErrorResponse> handleApplicationException(final ApplicationException err) {
        log.error("handleEntityNotFoundException", err);
        final ErrorCode errorCode = err.getErrorCode();
        final ErrorResponse response = ErrorResponse.of(errorCode);
        return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getHttpStatus()));
    }

    @ExceptionHandler
    protected ResponseEntity<ErrorResponse> handleAuthenticationException(final AuthenticationException err) {
        log.error("handleAuthenticationException", err);
        final ErrorResponse response = ErrorResponse.of(ErrorCode.INVALID_LOGIN_INFO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getHttpStatus()));
    }

    @ExceptionHandler
    protected ResponseEntity<ErrorResponse> handleCommonException(final Exception err) {
        log.error("CommonException", err);
        final ErrorResponse response = ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
