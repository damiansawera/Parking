package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.service.DocumentService;

import java.util.Map;

@RestController
@RequestMapping("/document")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class DocumentController {
    private DocumentService documentService;

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateDocument(@RequestBody Map<String, Object> data) {
        return ResponseEntity.status(HttpStatus.OK).body(documentService.generateDocument(data));
    }

}
