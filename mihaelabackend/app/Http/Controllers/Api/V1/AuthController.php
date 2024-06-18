<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try
        {
            $validateUser = Validator::make($request->all(),
            [
                'username' => 'required',
                'password' => 'required'
            ]);
            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ],401);
            }
            if(!Auth::attempt($request->only(['username', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Wrong credentials',   
                ],401);
            }

            $user = User::where('username', $request->username)->first();
            $name = $user->name;
            return response()->json([
                'status' =>true,
                'message' => 'Succesfully logged in',
                'token' => $user->createToken('admin-token')->plainTextToken,
                'name' =>$name
            ],200);
        }
        catch(\Throwable $th)
        {
            return response()->json([
                'status' =>false,
                'message' => $th->getMessage(),
            ]);
        }
        
        // $request->validate([
        //     'username' => 'required|alpha',
        //     'password' => 'required',
        // ]);

        // $admin = Admin::where('username', $request->username)->first();
        // $name = $admin->name;
        // if (! $admin || ! Hash::check($request->password, $admin->password)) {
        //     return response()->json(['error' => 'Unautorized'], 401);
        // }

        // $token = $admin->createToken('admin-token')->plainTextToken;

        // return response()->json(['token' => $token, 'username' => $request->username, 'name' => $name]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        // Revoke all tokens associated with the user
    PersonalAccessToken::where('tokenable_id', $user->id)
        ->where('tokenable_type', User::class)
        ->delete();
        return response()->json([
            'status' => true,
            'message' =>'User logged out',
            'data'=>[],
        ], 200);
        // $request->user()->tokens()->delete();
        

        // return response()->json(['message' => 'Logged out successfully']);
    }
    public function home(){
        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message' =>'Users data',
            'data'=>$userData,
        ], 200);
    }
}
