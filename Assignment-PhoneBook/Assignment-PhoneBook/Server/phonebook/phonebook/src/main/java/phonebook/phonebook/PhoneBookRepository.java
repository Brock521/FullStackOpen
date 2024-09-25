package phonebook.phonebook;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneBookRepository extends CrudRepository<PhoneBookEntry, Long> {
}