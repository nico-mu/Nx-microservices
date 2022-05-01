import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class HashingService {
  hash(value: string): Observable<string> {
    return from(bcrypt.hash(value, 10));
  }

  compare(value: string, hash: string): Observable<boolean> {
    return from(bcrypt.compare(value, hash));
  }
}
