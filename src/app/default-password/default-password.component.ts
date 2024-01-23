import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePasswordDTO } from '../change-password/ChangePassword';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
import { User } from '../user-management/user';
declare const $;

@Component({
  selector: 'app-default-password',
  templateUrl: './default-password.component.html',
  styleUrls: ['./default-password.component.css']
})
export class DefaultPasswordComponent implements OnInit {

  responseMsg:any;
  responseError:any;
  passwordDTO = new ChangePasswordDTO();
  passwordStatus:boolean;
  msg:any;
  userId:any;
  @Output()
  @Input()user:User;
  pageStatus:boolean = false;


  constructor(private apiService: APIService,private route:Router) { }

  ngOnInit() {
    this.msg = localStorage.getItem("passwordAlert");
    this.userId = localStorage.getItem("userIdForChangePassword");
    var pass = localStorage.getItem("pass");
    if(this.userId == pass)
    {
      this.responseError = this.msg;
      console.log(this.responseError);
    }

    

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip(); 
  });

    $(function(){
      $(".showpassword").each(function(index,input) {
          var $input = $(input);
          $('<label class="showpasswordlabel"/>').append(
              $("<input type='checkbox' class='showpasswordcheckbox' />").click(function() {
                  var change = $(this).is(":checked") ? "text" : "password";
                  var rep = $("<input type='" + change + "' />")
                      .attr("id", $input.attr("id"))
                      .attr("name", $input.attr("name"))
                      .attr('class', $input.attr('class'))
                      .val($input.val())
                      .insertBefore($input);
                  $input.remove();
                  $input = rep;
               })
          ).append($("<span/>").text("Show password")).insertAfter($input);
      });
  });


  jQuery(document).ready(function($) {

    jQuery('#password').keyup(function(){
      jQuery('#result').html(checkStrength($('#password').val()))
    })    
  
    function checkStrength(password){
  
    var strength = 0
  
    if (password.length < 14) { 
      $('#result').removeClass()
      $('#result').addClass('short green')
      return 'Too short' 
     }
  
    if (password.length > 7) strength += 1
  
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1
  
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 
  
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1
  
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
  
  
  if (strength < 2 ) {
      $('#result').removeClass()
      $('#result').addClass('weak');
      $('#result').addClass('red');
      return 'Weak'           
  } else if (strength == 2 ) {
      $('#result').removeClass('green');
      $('#result').addClass('orange');
      return 'Good'       
  } else {
      $('#result').removeClass('red')
      $('#result').removeClass('orange')
      $('#result').addClass('strong')
       $('#result').addClass('green')
      return 'Strong'
  }
  }
  });

  }

  public changePassword(newPassword:string,confirmPassword:string)
  {
    console.log(newPassword,confirmPassword);
    var userId = localStorage.getItem("userIdForChangePassword");
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{14,20}$/;
    var passValidation1 = regularExpression.test(newPassword);
    var passValidation2 = regularExpression.test(confirmPassword);
    
  
    if(newPassword === confirmPassword)
    {
      var lowNewPass = newPassword.toLowerCase();
      var lowUserId = this.userId.toLowerCase();
      console.log(lowNewPass);
      console.log(lowUserId);
     
       var lowCheck = lowNewPass.includes(lowUserId,0)
      
      if(lowCheck)
      {
        this.responseError = "Password should not Contain user ID!";
        this.responseMsg = null;
      }
      else
      {
      if(passValidation1 == true && passValidation2 == true)
      {
      this.passwordDTO.userId = userId;
      this.passwordDTO.password = newPassword;
      console.log(this.passwordDTO);
      this.apiService.changePassword(this.passwordDTO).subscribe(resp=>{
        this.responseMsg = resp;
        if(this.responseMsg == true)
        {
          this.responseMsg = "Password Updated!";
          alert("Password Updated!");
          this.route.navigateByUrl("#");
          window.location.reload();
          //this.route.navigateByUrl("userHome");
          this.pageStatus = true;
          this.responseError = null;
          this.passwordStatus = true;
          
        }
      },error=>{
        if(HttpErrorResponse)
        {
          this.responseError = "Failed!";
          this.responseMsg = null;
          this.passwordStatus = false;
        }
      });
    }
    else{
      this.responseError = "Password does not meet the requirement!";
    }
  }
  }
    else
    {
      this.responseError = "Password Mismatch!";
      this.responseMsg = null;
      this.passwordStatus = false;
    }
 }
 
  reset()
  {
    this.responseError = null;
    this.responseMsg = null;
    this.passwordStatus =  false;  
    this.pageStatus = false;
  }

}
