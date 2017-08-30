import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for-and-track-by',
  templateUrl: './ng-for-and-track-by.component.html',
  styleUrls: ['./ng-for-and-track-by.component.css']
})
export class NgForAndTrackByComponent {
  courses;

  loadCourses() {
    this.courses = [
      {id: 1, name: 'course1'},
      {id: 2, name: 'course2'},
      {id: 3, name: 'course3'},
    ];
  }

  onAdd() {
    this.courses.push({id: 4, name: 'course4'});
  }

  onRemove(course) {
    const index = this.courses.indexOf(course);
    this.courses.splice(index, 1);

  }

  trackCourse(index, course) {
    return course ? course.id : undefined;
  }
}
