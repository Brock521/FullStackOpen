package phonebook.phonebook;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PhoneBookRepository extends JpaRepository<PhoneBookEntry, Long> {
}