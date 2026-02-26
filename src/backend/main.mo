import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  let contactMessages = List.empty<ContactMessage>();

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      message;
    };
    contactMessages.add(newMessage);
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
