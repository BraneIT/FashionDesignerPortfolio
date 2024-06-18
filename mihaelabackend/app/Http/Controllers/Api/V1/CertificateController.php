<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Certificates\StoreCertificateRequest;
use App\Services\CertificateService;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    protected CertificateService $certificateService;

    public function __construct(CertificateService $certificateService){
        $this->certificateService = $certificateService;
    }

    public function index(){
        try{
        $certificates = $this->certificateService->getAllCertificates();
        return response()->json([
            'status' => true,
            'message' => 'Certificates fetched successfully',
            'data' => $certificates
        ], 200);
        }catch(\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Error while fetching certificates',
            ], 400);
        }
    }

    public function show($id){
        try{
            $certificate = $this->certificateService->getSingleCertificate($id);
            return response()->json([
                'status' => true,
                'message' => 'Certificate fetched successfully',
                'data' => $certificate
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Certificate not found',
                'data' => null,
                'error' => $e
            ], 404);
        }
    }

    public function store(StoreCertificateRequest $request){
        print_r($request->validated());
        // try{
        //     $certificate = $this->certificateService->store($request->validated());
        //     return response()->json([
        //         'status' => true,
        //         'message' => 'Certificate created successfully',
        //         'data' => $certificate
        //     ], 200);
        // }catch(\Exception $e){
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Error while creating certificate',
        //         'data' => null,
        //         'error' => $e
        //     ], 400);
        // }
    }
}
