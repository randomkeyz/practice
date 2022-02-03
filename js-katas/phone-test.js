/* 
"(123) 456-7890"  => true
"(1111)555 2345"  => false
"(098) 123 4567"  => false 
*/

function validPhoneNumber(phoneNumber){
    //TODO: Return whether phoneNumber is in the proper form
    const regex = /^\([0-9]{3}\)[\s][0-9]{3}-[0-9]{4}$/g;
    if(regex.test(phoneNumber)) return true;
    return false;
}