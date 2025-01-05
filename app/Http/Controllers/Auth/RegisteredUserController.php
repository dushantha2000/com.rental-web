<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        

        $type = $request->input('type');

        if ($type === 'renter') {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'password' => 'required',
                'type' => 'required|in:renter,landlord',
                'phone_number' => 'required',
                'address' => $type === 'landlord' ? 'required' : 'nullable',
            ]);
            

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => $request->type,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
        } else {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'type' => 'required|in:landlord',
                'password' => 'required',
                'phone_number' => 'required|digits_between:10,15',
                'address' => 'required',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => $request->type,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard'));
    }
}
