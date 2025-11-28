import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Lean' },
    { id: 2, name: 'Ana' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  findByName(name?: string): User[] {
    if (!name) {
      return this.users;
    }

    const filtered = this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (filtered.length === 0) {
      throw new NotFoundException('No se encontraron usuarios');
    }

    return filtered;
  }

  create(data: Partial<User>): User {
    const newUser = {
      id: Date.now(),
      name: data.name || 'Sin nombre',
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: Partial<User>): User {
    const user = this.findById(id);

    const updatedUser = { ...user, ...data };

    this.users = this.users.map((user) => {
      return user.id === id ? updatedUser : user;
    });

    return updatedUser;
  }

  delete(id: number): string {
    this.findById(id);

    this.users = this.users.filter((user) => user.id !== id);

    return `Usuario ${id} eliminado`;
  }
}
