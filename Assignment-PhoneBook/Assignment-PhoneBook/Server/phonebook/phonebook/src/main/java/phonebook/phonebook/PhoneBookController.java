package phonebook.phonebook;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/PhoneBook/Api")
public class PhoneBookController {

    private final PhoneBookRepository phoneBookRepository;

    public PhoneBookController(PhoneBookRepository phoneBookRepository) {
        this.phoneBookRepository = phoneBookRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhoneBookEntry> findById(@PathVariable Long id) {
        Optional<PhoneBookEntry> phoneBookEntry = phoneBookRepository.findById(id);
        return phoneBookEntry.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<PhoneBookEntry>> findAll() {
        List<PhoneBookEntry> phoneBookEntries = (List<PhoneBookEntry>) phoneBookRepository.findAll();
        return phoneBookEntries.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(phoneBookEntries);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhoneBookEntry> updateEntry(@PathVariable Long id, @RequestBody PhoneBookEntry incomingPhoneBookEntry) {
        return phoneBookRepository.findById(id).map(existingEntry -> {
            existingEntry.setName(incomingPhoneBookEntry.getName());
            existingEntry.setPhoneNumber(incomingPhoneBookEntry.getPhoneNumber());
            phoneBookRepository.save(existingEntry);
            return ResponseEntity.ok(existingEntry);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PhoneBookEntry> saveEntry(@RequestBody PhoneBookEntry newPhoneBookRequest) {
        PhoneBookEntry savedPhoneBookEntry = new PhoneBookEntry();
        savedPhoneBookEntry.setName(newPhoneBookRequest.getName());
        savedPhoneBookEntry.setPhoneNumber(newPhoneBookRequest.getPhoneNumber());
        phoneBookRepository.save(savedPhoneBookEntry);
        return ResponseEntity.ok(savedPhoneBookEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable long id) {
        if (phoneBookRepository.existsById(id)) {
            phoneBookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
