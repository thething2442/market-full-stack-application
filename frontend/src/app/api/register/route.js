import { NextResponse } from "next/server";
import { db } from "@/app/dbconfiguration/db";
import { users } from "../../../../drizzle/schema";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import {v4 as uuid} from 'uuid'

const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!isPasswordStrong(password)) {
        return NextResponse.json(
          {
            message:
              "Password is not strong enough. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
          },
          { status: 400 }
        );
      }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }


    
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      id: uuid(),
      name,
      email,
      hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration.", error: error.message },
      { status: 500 }
    );
  }
}
