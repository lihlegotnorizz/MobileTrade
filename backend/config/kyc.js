/**
 * KYC Verification Service
 * Handles ID document verification for South African users
 */

const fs = require('fs');
const path = require('path');

class KYCService {
    /**
     * Validate ID number format (South African ID)
     */
    static validateSAIdNumber(idNumber) {
        // SA ID Format: YYMMDDSSSSSCZ (13 digits)
        // Y = Year, M = Month, D = Day, S = Serial, C = Citizenship, Z = Check digit
        
        const idRegex = /^\d{13}$/;
        
        if (!idRegex.test(idNumber)) {
            return {
                valid: false,
                message: 'Invalid ID format. South African ID must be 13 digits.'
            };
        }

        // Validate Luhn algorithm for check digit
        const checkDigit = this.calculateLuhnCheckDigit(idNumber.slice(0, 12));
        if (parseInt(idNumber.charAt(12)) !== checkDigit) {
            return {
                valid: false,
                message: 'Invalid ID check digit.'
            };
        }

        // Extract and validate date
        const year = parseInt(idNumber.slice(0, 2));
        const month = parseInt(idNumber.slice(2, 4));
        const day = parseInt(idNumber.slice(4, 6));

        // Convert 2-digit year to 4-digit
        const fullYear = year < 30 ? 2000 + year : 1900 + year;

        // Validate month and day
        if (month < 1 || month > 12) {
            return { valid: false, message: 'Invalid month in ID.' };
        }

        if (day < 1 || day > 31) {
            return { valid: false, message: 'Invalid day in ID.' };
        }

        return {
            valid: true,
            message: 'ID number is valid',
            birthDate: new Date(fullYear, month - 1, day),
            citizenship: parseInt(idNumber.charAt(10)) === 1 ? 'SA Citizen' : 'Permanent Resident'
        };
    }

    /**
     * Calculate Luhn check digit
     */
    static calculateLuhnCheckDigit(number) {
        let sum = 0;
        let isEven = false;

        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return (10 - (sum % 10)) % 10;
    }

    /**
     * Validate document upload
     */
    static validateDocumentUpload(file) {
        const allowedFormats = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxFileSize = 5 * 1024 * 1024; // 5MB

        const errors = [];

        // Check file type
        if (!allowedFormats.includes(file.mimetype)) {
            errors.push('Only JPEG, PNG, or PDF documents are allowed.');
        }

        // Check file size
        if (file.size > maxFileSize) {
            errors.push('Document size must not exceed 5MB.');
        }

        // Check file naming (security)
        if (file.originalname.includes('..') || file.originalname.includes('/')) {
            errors.push('Invalid filename.');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Mock KYC verification (in production, use AI/ML service)
     */
    static async verifyDocument(documentPath, userId) {
        // In production, use services like:
        // - AWS Rekognition
        // - Google Vision API
        // - IDology (for ID verification)
        // - Onfido (enterprise KYC solution)

        return {
            status: 'pending',
            userId: userId,
            documentPath: documentPath,
            verificationId: `KYC_${Date.now()}`,
            message: 'Document received. Manual verification in progress.',
            estimatedTime: '24-48 hours',
            createdAt: new Date()
        };
    }

    /**
     * Check user KYC status
     */
    static getKYCStatus(user) {
        return {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            kycStatus: user.kycStatus,
            isVerifiedSeller: user.isVerifiedSeller,
            idVerified: user.kycStatus === 'verified',
            canSell: user.kycStatus === 'verified',
            lastUpdateDate: user.updatedAt || user.createdAt,
            message: this.getStatusMessage(user.kycStatus)
        };
    }

    /**
     * Get human-readable status message
     */
    static getStatusMessage(status) {
        const messages = {
            'pending': '⏳ Verification in progress. You will be notified once complete.',
            'verified': '✅ Your account is verified. You can now buy and sell phones.',
            'rejected': '❌ Verification failed. Please contact support for more information.'
        };
        return messages[status] || 'Unknown status';
    }
}

module.exports = KYCService;

/**
 * USAGE EXAMPLE - KYC Verification Endpoint:
 * 
 * const express = require('express');
 * const multer = require('multer');
 * const KYCService = require('./kyc');
 * 
 * const router = express.Router();
 * const upload = multer({ dest: 'uploads/kyc-documents/' });
 * 
 * // Validate ID number
 * router.post('/validate-id', (req, res) => {
 *     const { idNumber } = req.body;
 *     const validation = KYCService.validateSAIdNumber(idNumber);
 *     res.json(validation);
 * });
 * 
 * // Upload ID document
 * router.post('/upload-document', upload.single('document'), async (req, res) => {
 *     try {
 *         // Validate upload
 *         const validation = KYCService.validateDocumentUpload(req.file);
 *         if (!validation.valid) {
 *             return res.status(400).json(validation);
 *         }
 *         
 *         // Verify document
 *         const verification = await KYCService.verifyDocument(
 *             req.file.path,
 *             req.userId
 *         );
 *         
 *         res.json(verification);
 *     } catch (error) {
 *         res.status(500).json({ error: error.message });
 *     }
 * });
 * 
 * // Get KYC status
 * router.get('/status', authMiddleware, async (req, res) => {
 *     const user = await User.findById(req.userId);
 *     const status = KYCService.getKYCStatus(user);
 *     res.json(status);
 * });
 */
