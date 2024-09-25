package phonebook.phonebook;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("PHONEBOOKENTRIES")
public record PhoneBookEntry(@Id long id, String name, @Column("PHONENUMBER") String phoneNumber) {
}