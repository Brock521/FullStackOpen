package phonebook.phonebook;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/PhoneBook/Api")
public class PhoneBookController {

    private final PhoneBookRepository phoneBookRepository;


    // Constructor injection
    public PhoneBookController(PhoneBookRepository phoneBookRepository) {
        this.phoneBookRepository = phoneBookRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhoneBookEntry> findByID(@PathVariable Long id) {
       Optional<PhoneBookEntry> phoneBookEntry = phoneBookRepository.findById(id);
        if(phoneBookEntry.isPresent()){
            return ResponseEntity.ok(phoneBookEntry.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<PhoneBookEntry>> findAll() {
        List<PhoneBookEntry> phoneBookEntries = (List<PhoneBookEntry>) phoneBookRepository.findAll();

        System.out.println("This is the size of all phonebook entries " + phoneBookEntries.size());
        if(phoneBookEntries.size() > 0){
            return ResponseEntity.ok(phoneBookEntries);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<PhoneBookEntry>> deleteEntry(@PathVariable long id) {

        if (phoneBookRepository.findById(id).isPresent()){
            phoneBookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
