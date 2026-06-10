include("chirp.jl")
include("transducer.jl")
include("interference.jl")
include("flayer.jl")
include("adapter.jl")
include("dissonance.jl")
include("bifurcation.jl")

function run_s()
    s = 96000
    f_u = 40000
    r_l = 3.95
    x = 0.5
    t = 0.0
    
    b_l = Int(s * 0.2)
    
    c1 = Channel{Vector{Float64}}(64)
    c2 = Channel{Vector{Float64}}(64)
    c3 = Channel{Vector{Float64}}(64)
    c4 = Channel{Matrix{Float64}}(16)
    
    @async begin
        b_c = g_c(s, 5.0)
        put!(c1, b_c)
        while true
            p, x = c_b(x, r_l)
            b_f, m = f_s(s, p, p)
            put!(c2, b_f)
            put!(c4, m)
            if rand() < 0.05
                display(m[1:8, 1:8])
            end
        end
    end
    
    @async begin
        while true
            b_f = take!(c2)
            h, d = c_d(b_f, s)
            b_a = a_s(b_f, h, d, t, s)
            put!(c3, b_a)
        end
    end
    
    b_i = take!(c1)
    write(stdout, b_i)
    
    while true
        b_a = take!(c3)
        m_r = take!(c4)
        
        h_z = c_h(b_a, s, f_u)
        
        b_o = m_w(b_a, h_z, s)
        
        write(stdout, b_o)
        
        t += length(b_o) / s
        
        if rand() < 0.01
            println("\n[SYSTEM_STATE_T=$(round(t, digits=2))]")
            println("MU_INTERFERENCE=$(sum(h_z)/length(h_z))")
            println("SPECTRAL_ENTROPY=$(sum(m_r)/length(m_r))")
        end
    end
end

run_s()
