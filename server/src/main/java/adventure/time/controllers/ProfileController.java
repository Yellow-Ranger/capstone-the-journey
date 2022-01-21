package adventure.time.controllers;

import adventure.time.domain.Result;
import adventure.time.domain.ProfileService;
import adventure.time.models.AppUser;
import adventure.time.models.Profile;
import adventure.time.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;
    private final AppUserService appUserService;

    public ProfileController(ProfileService service, AppUserService appUserService){
        this.service = service;
        this.appUserService = appUserService;
    }

    @GetMapping("/{username}")
    public Profile findById(@PathVariable String username){
//        System.out.println(service.findByUserId(1));
        int userId = appUserService.getUserIdByUsername(username);
        if(userId != 0){
            return service.findByUserId(userId);
        }
        return null;
    }

    @PostMapping("/username")
    public ResponseEntity<Object> add(@PathVariable String username, @RequestBody Profile profile){
        profile.setUserId(appUserService.getUserIdByUsername(username));
        Result<Profile> result = service.add(profile);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

//    @DeleteMapping("/{userId}")
//    public ResponseEntity<Void> deleteById(@PathVariable int userId){
//        if(service.deleteById(userId)){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }

}