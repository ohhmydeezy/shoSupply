import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact.component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;
  #builder = inject(FormBuilder);
  #toastr = inject(ToastrService);
  successMessage = '';

  ngOnInit() {
    this.FormData = this.#builder.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Message: ['', Validators.required],
    });
  }

  sendEmail(e: Event) {
    emailjs
      .sendForm(
        environment.serviceID,
        environment.templateID,
        e.target as HTMLFormElement,
        {
          publicKey: environment.mailJsPublicKey,
        }
      )
      .then(
        () => {
          this.#toastr.success('Message sent successfully!', 'Success');
          this.successMessage = 'Your message has been sent successfully!';
          setTimeout(() => (this.successMessage = ''), 5000);
          this.FormData.reset();
        },
        (error: any) => {
          this.#toastr.error(
            'Failed to send message. Please try again.',
            'Error'
          );
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        }
      );
  }
}
