import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { QuestionComponent } from './modals/question/question.component';

@NgModule({
  declarations: [
    // components

    // directives

    // pipes
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    // modules
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,

    // components
    QuestionComponent,

    // directives

    // pipes
  ],
})
export class SharedModule {
  static injector: Injector;

  constructor(injector: Injector) {
    SharedModule.injector = injector;
  }
}
