package com.rent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rent.exception.CustomerNotFoundException;
import com.rent.model.Customer;
import com.rent.repo.CustomerRepo;

@Service
public class CustomerServiceImp implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public Customer addCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {

        return customerRepo.findById(id)
                .orElseThrow(() ->
                    new CustomerNotFoundException(
                        "Customer not found with id: " + id
                    )
                );
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {

        Customer existingCustomer = customerRepo.findById(id)
                .orElseThrow(() ->
                    new CustomerNotFoundException(
                        "Customer not found with id: " + id
                    )
                );

        existingCustomer.setName(customer.getName());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setLicenseNumber(customer.getLicenseNumber());

        return customerRepo.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {

        if (!customerRepo.existsById(id)) {
            throw new CustomerNotFoundException(
                "Customer not found with id: " + id
            );
        }

        customerRepo.deleteById(id);
    }
}