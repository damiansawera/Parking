package project.parking.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.xml.bind.JAXBException;
import lombok.AllArgsConstructor;
import org.docx4j.Docx4J;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DocumentService {
    private final ObjectMapper objectMapper;

    public byte[] generateDocument(Map<String, Object> data) {
        try {
            InputStream document_template = new ClassPathResource("templates/parking_receipt_template.docx").getInputStream();
            WordprocessingMLPackage wordprocessingMLPackage = WordprocessingMLPackage.load(document_template);

            Map<String, String> mappings = data.entrySet()
                            .stream()
                            .collect(Collectors.toMap(
                                    Map.Entry::getKey,
                                    entry -> objectMapper.convertValue(entry.getValue(), String.class)
                            ));

            wordprocessingMLPackage.getMainDocumentPart().variableReplace(mappings);

            ByteArrayOutputStream pdf = new ByteArrayOutputStream();
            Docx4J.toPDF(wordprocessingMLPackage, pdf);
            return pdf.toByteArray();

        } catch (IOException | JAXBException | Docx4JException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Something went wrong with document generation");
        }
    }
}
