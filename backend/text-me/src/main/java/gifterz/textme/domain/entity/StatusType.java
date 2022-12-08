package gifterz.textme.domain.entity;

public enum StatusType {
    ACTIVATE(0, "ACTIVATE"),
    DELETED(1, "DELETED"),
    DEACTIVATE(2, "DEACTIVATE");

    final int number;
    final String status;

    StatusType(int number, String status) {
        this.number = number;
        this.status = status;
    }
}
