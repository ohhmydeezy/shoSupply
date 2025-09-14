import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact.component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;
  #builder = inject(FormBuilder);

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
          console.log('SUCCESS!');
        },
        (error: any) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        }
      );
  }
}
