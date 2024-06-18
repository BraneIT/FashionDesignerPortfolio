<?php

namespace App\Services;

use App\Models\Certificate;
use Intervention\Image\Facades\Image as InterventionImage;

class CertificateService{

    public function getAllCertificates(){
        return Certificate::select("id", "name", "file_path")->get();
    }

    public function store(array $data){
        $certificate = new Certificate();
        $certificate->name = $data['name'];
        $certificate->file_path = $this->storeFile($data['file'], $data['name']);
        $certificate->save();
        return $certificate;
    }

    public function getSingleCertificate($id){
        return Certificate::findOrFail($id);
    }

    public function updateCertificate($id, array $data){
        $certificate = $this->getSingleCertificate($id);
        $certificate->name = $data['name'];
        $certificate->file_path = $this->storeFile($data['file'], $data['name']);
        $certificate->save();
        return $certificate;
    }

    public function deleteCertificate($id){
        return Certificate::findOrFail($id)->delete();
    }

    public function storeFile($file, $certificateName){
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = $originalName . '_' . time() . '.webp';
            $optimizedImage = InterventionImage::make($file)->encode('webp', 50);
            $directory = 'images/projects/' . $certificateName;
            if (!file_exists($directory)) {
                mkdir($directory, 775, true);
            }
            $optimizedImage->save(public_path('images/projects') .'/' . $certificateName . '/' . $fileName);
            return '/images/projects/'. $certificateName .'/'. $fileName; // 
        }
    
}