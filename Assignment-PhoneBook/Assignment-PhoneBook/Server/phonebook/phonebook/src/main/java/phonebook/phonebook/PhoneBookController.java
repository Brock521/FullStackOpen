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

    @GetMapping("{id}")
    public ResponseEntity<PhoneBookEntry> findByID(@PathVariable Long id) {
       Optional<PhoneBookEntry> phoneBookEntryOptional = phoneBookRepository.findById(id);
        if(phoneBookEntryOptional.isPresent()){
            return ResponseEntity.ok(phoneBookEntryOptional.get());
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

}
